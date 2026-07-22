interface JsonLdProps {
  data: object
}

/**
 * Structured data render trong body — Google đọc bình thường, prerender xuất tĩnh.
 * Data chỉ đến từ site.ts (tĩnh, tự quản); escape "<" để không thể thoát khỏi thẻ script.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
