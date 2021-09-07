import React from 'react'

import { render } from '@testing-library/react-native'

import buildConfig from '../../constants/buildConfig'
import Caption from '../Caption'

describe('Caption', () => {
  it('should render and display a Caption', () => {
    const { getByText } = render(<Caption title='This is a test title!' theme={buildConfig().lightTheme} />)
    getByText('This is a test title!')
  })
})
