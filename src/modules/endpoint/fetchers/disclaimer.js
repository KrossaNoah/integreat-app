// @flow

import { apiUrl } from '../constants'
import DisclaimerModel from '../models/DisclaimerModel'
import { isEmpty } from 'lodash/lang'
import type { Dispatch } from 'redux-first-router/dist/flow-types'
import EndpointBuilder from '../EndpointBuilder'
import Payload from '../Payload'

type Params = {
  city: string,
  language: string
}

export default (dispatch: Dispatch, oldPayload: Payload, params: Params): Promise<Payload> => new EndpointBuilder('disclaimer')
  .withParamsToUrlMapper((params: Params): string => `${apiUrl}/${params.city}/${params.language}/wp-json/extensions/v0/modified_content/disclaimer?since=1970-01-01T00:00:00Z`)
  .withMapper((json: any): DisclaimerModel => {
    if (isEmpty(json)) {
      throw new Error('disclaimer:notAvailable')
    }

    const disclaimers = json
      .filter(disclaimer => disclaimer.status === 'publish')
      .map(disclaimer => {
        return new DisclaimerModel({
          id: disclaimer.id,
          title: disclaimer.title,
          content: disclaimer.content
        })
      })

    if (disclaimers.length !== 1) {
      throw new Error('There must be exactly one disclaimer!')
    }
    return disclaimers[0]
  })
  .build()
  .fetchData(dispatch, oldPayload, params)
