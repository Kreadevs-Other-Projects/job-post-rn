export const timeAgo = (dateIso) => {
    if (!dateIso) return ''
    const then = new Date(dateIso).getTime()
    const now = Date.now()
    const diff = Math.max(0, Math.floor((now - then) / 1000))
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }