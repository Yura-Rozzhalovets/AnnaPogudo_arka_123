import { useEffect, useState } from 'react'

function ArchMark({ className = '', animate = false }) {
  return (
    <svg
      className={`arch-mark ${animate ? 'arch-mark--animate' : ''} ${className}`}
      viewBox="0 0 120 126"
      role="img"
      aria-label="Арка 123"
    >
      <path className="arch-mark__line" d="M12 116V58a48 48 0 0 1 96 0v58" />
      <text x="60" y="99" textAnchor="middle">123</text>
    </svg>
  )
}

function BrandLogo({ light = false }) {
  return (
    <a className={`brand-logo ${light ? 'brand-logo--light' : ''}`} href="#top" aria-label="АРКА 123 — на главную">
      <ArchMark />
      <span className="brand-logo__wordmark">
        <strong>АРКА <span>123</span></strong>
        <small>ВСТРЕЧАЕМСЯ НАПРОТИВ БИБЛИОТЕКИ</small>
      </span>
    </a>
  )
}

function BrandCharacter({ className = '' }) {
  return <img className={`brand-character ${className}`} src="images/anna-arka-interior.jpg" alt="Анна — фирменный персонаж АРКА 123" />
}

function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1450)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null
  return (
    <div className="preloader" aria-label="Загрузка сайта">
      <ArchMark animate />
      <span>АРКА 123</span>
    </div>
  )
}

export { ArchMark, BrandLogo, BrandCharacter, Loader }
