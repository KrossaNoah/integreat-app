// @flow

import React from 'react'
import { ActivityIndicator, Dimensions, Linking, Text } from 'react-native'
import { WebView } from 'react-native-webview'
import styled from 'styled-components'
import type { ThemeType } from '../../theme/constants/theme'
import RNFetchblob from 'rn-fetch-blob'
import { URL_PREFIX } from '../../platform/constants/webview'
import type { WebViewEvent } from 'react-native-webview/js/WebViewTypes'
import { withNavigation } from 'react-navigation'
import renderHtml from '../renderHtml'

const WebContainer = styled.View`
  flex: 1;
  height: ${props => Dimensions.get('screen').height - 60}
`
type PropType = {
  title: string,
  content: string,
  theme: ThemeType,
  files: { [url: string]: string }
}

class Page extends React.Component<PropType> {
  onLinkPress = (url: string) => {
    console.debug(url)
    if (url.includes('.pdf')) {
      // this.props.navigation.navigate('PDF', {url})
    } else if (url.includes('.png') || url.includes('.jpg')) {
      this.props.navigation.navigate('Image', {url})
    } else {
      Linking.openURL(url).catch(err => console.error('An error occurred', err))
    }
  }

  // For iOS
  onShouldStartLoadWithRequest = (event: WebViewEvent) => {
    const url = event.url
    if (url.endsWith('/Documents')) {
      return true
    }

    this.onLinkPress(url)

    return false
  }

  // For android
  onOverrideUrlLoading = event => {
    this.onLinkPress(event.nativeEvent.url)
  }

  renderError = (errorDomain: ?string, errorCode: number, errorDesc: string) => {
    return <Text>${errorDomain} ${errorCode} ${errorDesc}</Text>
  }

  render () {
    return (
      <>
        <WebContainer theme={this.props.theme}>
          <WebView
            source={{
              baseUrl: URL_PREFIX + RNFetchblob.fs.dirs.DocumentDir,
              html: renderHtml(this.props.content, this.props.files)
            }}
            allowFileAccess // Needed by android to access file:// urls
            originWhitelist={['*']} // Needed by iOS to load the initial html
            useWebKit={false} // If true iOS does not load file:// urls
            javaScriptEnabled

            dataDetectorTypes={'all'}
            domStorageEnabled={false}

            renderError={this.renderError}

            urlOverridingEnabled
            onOverrideUrlLoading={this.onOverrideUrlLoading}
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          />
        </WebContainer>
      </>
    )
  }
}

export default withNavigation(Page)
