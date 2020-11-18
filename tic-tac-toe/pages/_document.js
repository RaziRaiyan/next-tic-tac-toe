import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
        <link rel="shortcut icon" href="/logo_new.svg" />
        </Head>

        <body className="bg-gray-100 font-balsamiq">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument