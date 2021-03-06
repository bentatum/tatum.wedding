import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { getContext, setContext } from '../theme/context'

export default class MyDocument extends Document {
  static getInitialProps (ctx) {
    // Resolution order
    //
    // On the server:
    // 1. page.getInitialProps
    // 2. document.getInitialProps
    // 3. page.render
    // 4. document.render
    //
    // On the server with error:
    // 2. document.getInitialProps
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. page.getInitialProps
    // 3. page.render

    // Reset the context for handling a new request.
    setContext()
    const page = ctx.renderPage()
    // Get the context with the collected side effects.
    const context = getContext()
    return {
      ...page,
      styles: (
        <style
          id='jss-server-side'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: context.sheetsRegistry.toString()
          }}
        />
      )
    }
  }

  render () {
    const context = getContext()
    return (
      <html lang='en' dir='ltr'>
        <Head>
          <title>Allie & Ben Tatum - Wedding Photographs & Videos</title>
          <meta charSet='utf-8' />
          <meta name='robots' content='noindex, nofollow' />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name='viewport'
            content={
              'user-scalable=0, initial-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          {/*
            manifest.json provides metadata used when your web app is added to the
            homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
          */}
          <link rel='manifest' href='/static/manifest.json' />
          {/* PWA primary color */}
          <meta
            name='theme-color'
            content={context.theme.palette.primary[500]}
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'
          />
          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=UA-76151192-6'
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-76151192-6');
          `
            }}
          />
        </Head>
        <body style={{ minHeight: '100vh' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
