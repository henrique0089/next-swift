export function DownloadFile(data: any, filename: string) {
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')

  document.body.appendChild(a)

  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
