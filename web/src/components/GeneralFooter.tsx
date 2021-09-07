import React from 'react'
import { withTranslation, TFunction } from 'react-i18next'

import { MAIN_DISCLAIMER_ROUTE } from 'api-client'

import buildConfig from '../constants/buildConfig'
import { RoutePatterns } from '../routes'
import CleanLink from './CleanLink'
import Footer from './Footer'

type PropsType = {
  language: string
  t: TFunction
}

class GeneralFooter extends React.PureComponent<PropsType> {
  render() {
    const { language, t } = this.props
    const { aboutUrls, privacyUrls } = buildConfig()

    const aboutUrl = aboutUrls[language] || aboutUrls.default
    const privacyUrl = privacyUrls[language] || privacyUrls.default

    return (
      <Footer>
        <CleanLink to={RoutePatterns[MAIN_DISCLAIMER_ROUTE]}>{t('imprintAndContact')}</CleanLink>
        <CleanLink to={aboutUrl}>{t('settings:about', { appName: buildConfig().appName })}</CleanLink>
        <CleanLink to={privacyUrl}>{t('privacy')}</CleanLink>
      </Footer>
    )
  }
}

export default withTranslation(['layout', 'settings'])(GeneralFooter)
