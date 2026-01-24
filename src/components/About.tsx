import Link from 'next/link';

export default function About() {
  return (
    <section style={{
      padding: '6rem 4rem',
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontFamily: 'Playfair Display, Georgia, serif',
        fontSize: '2.5rem',
        fontWeight: 400,
        marginBottom: '2rem'
      }}>
        About This Archive
      </h2>
      
      <p style={{
        fontSize: '1.125rem',
        color: '#4a3f2f',
        lineHeight: 1.8,
        marginBottom: '1.5rem'
      }}>
        This project began over a decade ago when I stumbled upon a{' '}
        <Link href="https://www.loc.gov/collections/sanborn-maps/" style={{ color: '#8b4513' }}>
          small collection
        </Link>{' '}
        of incredible typography from the Sanborn Fire Insurance Maps. 
        I had never seen anything like them, and I became obsessed.
      </p>
      
      <p style={{
        fontSize: '1.125rem',
        color: '#4a3f2f',
        lineHeight: 1.8,
        marginBottom: '1.5rem'
      }}>
        The Sanborn Map Company created detailed maps of over 12,000 American towns and cities 
        between 1867 and 1970. Originally used by fire insurance companies to assess risk, 
        these maps now serve as an invaluable record of American urban history — and their 
        title pages are works of art in their own right.
      </p>
      
      <p style={{
        fontSize: '1.125rem',
        color: '#4a3f2f',
        lineHeight: 1.8,
        marginBottom: '1.5rem'
      }}>
        This archive is dedicated to preserving and sharing the incredible typography and 
        artistry of these maps. Every image is freely available for personal use. If you&apos;d 
        like a museum-quality print, we partner with archival print specialists to offer 
        custom-sized reproductions.
      </p>
      
      <Link 
        href="/about" 
        style={{ 
          color: '#8b4513', 
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: '1rem'
        }}
      >
        Read the full story →
      </Link>
    </section>
  );
}
