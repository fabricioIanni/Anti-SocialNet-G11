import { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { PostCard } from './PostCard'
import type { Post } from '../types'

const PAGE_SIZE = 5

interface PostListProps {
  posts: Post[]
  showImages?: boolean
}

export function PostList({ posts, showImages = false }: PostListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const bottomRef = useRef<HTMLDivElement>(null)
  const hasMore = visibleCount < posts.length

  useEffect(() => {
    if (!hasMore || !bottomRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisibleCount((count) => count + PAGE_SIZE)
    })
    observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [hasMore, visibleCount])

  return (
    <Row className="justify-content-center">
      <Col xs={12} lg={8} xl={6}>
        {posts.slice(0, visibleCount).map((post) => (
          <div key={post.id} className="mb-4">
            <PostCard post={post} showImages={showImages} />
          </div>
        ))}
        {hasMore && <div ref={bottomRef} style={{ height: 1 }} />}
      </Col>
    </Row>
  )
}
