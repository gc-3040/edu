import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Send, Trash2, MessageSquare, Clock, Lock } from 'lucide-react'

export default function CommunitySection({ user }) {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 1. 게시글 불러오기 및 실시간 연동
  useEffect(() => {
    fetchPosts()

    // 실시간 변경 감지 구독
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // 새 포스트를 상단에 추가 (이미 배열에 존재하지 않는 경우에만)
            setPosts((prev) => {
              if (prev.some((p) => p.id === payload.new.id)) return prev;
              return [payload.new, ...prev];
            });
          } else if (payload.eventType === 'DELETE') {
            setPosts((prev) => prev.filter((post) => post.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setPosts((prev) =>
              prev.map((post) => (post.id === payload.new.id ? payload.new : post))
            );
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      console.error('Error fetching posts:', err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // 2. GitHub OAuth 로그인
  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin,
        },
      })
      if (error) throw error
    } catch (err) {
      alert('GitHub 로그인에 실패했습니다: ' + err.message)
    }
  }

  // 3. 게시글 등록
  const handleSubmitPost = async (e) => {
    e.preventDefault()
    if (!newPost.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const profileName = user.user_metadata?.user_name || user.user_metadata?.full_name || user.email?.split('@')[0] || '사용자'
      const avatarUrl = user.user_metadata?.avatar_url || ''

      const { error } = await supabase.from('posts').insert([
        {
          user_id: user.id,
          user_name: profileName,
          user_avatar: avatarUrl,
          content: newPost.trim(),
        },
      ])

      if (error) throw error
      setNewPost('')
    } catch (err) {
      alert('게시글 등록에 실패했습니다. Supabase RLS 정책을 확인해보세요: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 4. 게시글 삭제
  const handleDeletePost = async (postId) => {
    if (!confirm('정말로 이 글을 삭제하시겠습니까?')) return

    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId)
      if (error) throw error
    } catch (err) {
      alert('글 삭제에 실패했습니다: ' + err.message)
    }
  }

  // 5. 날짜 표시 포맷팅
  const formatTime = (timeStr) => {
    const date = new Date(timeStr)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return '방금 전'
    if (diffMins < 60) return `${diffMins}분 전`
    if (diffHours < 24) return `${diffHours}시간 전`
    if (diffDays < 7) return `${diffDays}일 전`

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // 비로그인 상태 UI
  if (!user) {
    return (
      <section className="community-section">
        <div className="container">
          <div className="login-card-container reveal-fade-in">
            <div className="login-card">
              <div className="login-card-icon-wrapper">
                <Lock className="login-lock-icon" />
              </div>
              <h2 className="login-title">멤버 전용 커뮤니티</h2>
              <p className="login-subtitle">
                이곳은 <strong>3040 AI 길목 모임</strong> 멤버 전용 공간입니다.<br />
                GitHub 계정으로 로그인하여 자유롭게 아이디어를 나누고 글을 작성해보세요.
              </p>
              <button className="btn-github-login" onClick={handleGithubLogin}>
                <svg className="btn-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub로 간편 로그인
              </button>
              <div className="login-card-footer">
                <span>Supabase Secure Authentication으로 안전하게 연결됩니다.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // 로그인 상태 UI
  return (
    <section className="community-section">
      <div className="container">
        <div className="community-layout">
          {/* 좌측 사이드바 또는 상단 환영 메세지 */}
          <div className="community-header-bar">
            <div className="welcome-box">
              <MessageSquare className="welcome-icon" />
              <div>
                <h2>3040 AI 길목 커뮤니티</h2>
                <p>회원들과 자유롭게 의견과 보고서를 나누어보세요.</p>
              </div>
            </div>
          </div>

          {/* 포스팅 작성 박스 */}
          <div className="post-creator-card">
            <form onSubmit={handleSubmitPost}>
              <div className="post-input-header">
                {user.user_metadata?.avatar_url && (
                  <img src={user.user_metadata.avatar_url} alt="내 아바타" className="creator-avatar" />
                )}
                <span className="creator-name">
                  {user.user_metadata?.user_name || user.user_metadata?.full_name || user.email?.split('@')[0]}님, 오늘 어떤 이야기를 나누고 싶으신가요?
                </span>
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="내용을 입력해주세요. (최대 1000자)"
                maxLength={1000}
                required
                className="post-textarea"
                rows={4}
              />
              <div className="post-creator-footer">
                <span className="char-counter">{newPost.length} / 1000자</span>
                <button type="submit" disabled={isSubmitting || !newPost.trim()} className="btn-post-submit">
                  {isSubmitting ? (
                    <span className="spinner"></span>
                  ) : (
                    <>
                      <Send size={16} className="btn-icon" />
                      등록하기
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* 게시글 목록 */}
          <div className="posts-list-container">
            {isLoading ? (
              <div className="posts-loading">
                <div className="spinner-large"></div>
                <p>게시글을 불러오는 중입니다...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="posts-empty">
                <MessageSquare className="empty-icon" />
                <h3>아직 등록된 게시글이 없습니다</h3>
                <p>첫 번째 글의 주인공이 되어보세요!</p>
              </div>
            ) : (
              <div className="posts-list">
                {posts.map((post) => (
                  <div key={post.id} className="post-card reveal-fade-in">
                    <div className="post-card-header">
                      <div className="post-author-info">
                        {post.user_avatar ? (
                          <img src={post.user_avatar} alt={post.user_name} className="post-author-avatar" />
                        ) : (
                          <div className="post-author-avatar-placeholder">
                            {post.user_name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h4 className="post-author-name">{post.user_name}</h4>
                          <div className="post-meta">
                            <Clock size={12} className="meta-icon" />
                            <span>{formatTime(post.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      {user && user.id === post.user_id && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="btn-delete-post"
                          title="글 삭제"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="post-card-body">
                      <p className="post-content">{post.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
