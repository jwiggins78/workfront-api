/**
 * Copyright 2015 Workfront
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as fetchMock from 'fetch-mock'
import * as should from 'should'

import * as Workfront from '../../src/index'

const API_URL = 'http://foobar:8080'

describe('getApiKey', function() {

    afterEach(fetchMock.reset)
    afterEach(fetchMock.restore)

    beforeEach(function() {
        this.api = new Workfront.Api({
            url: API_URL
        })
    })
    afterEach(function() {
        this.api = undefined
    })

    it('requests generateApiKey when getApiKey returns blank', function(done) {
        fetchMock.mock(
            (url, opts) => opts.body.indexOf('getApiKey') !== -1,
            '{"data": {"result": ""}}',
            {name: 'getApiKey'}
        )
        fetchMock.mock(
            (url, opts) => opts.body.indexOf('generateApiKey') !== -1,
            '{"data": {"result": "baz"}}',
            {name: 'generateApiKey'}
        )

        this.api.getApiKey('foo', 'bar').then(function(apiKey) {
            should(apiKey).be.equal('baz')
            should(fetchMock.called('getApiKey')).be.true()
            should(fetchMock.called('generateApiKey')).be.true()
            done()
        })
    })
    it('does not call generateApiKey when getApiKey returns an api key', function(done) {
        fetchMock.mock(
            (url, opts) => opts.body.indexOf('getApiKey') !== -1,
            '{"data": {"result": "baz"}}',
            {name: 'getApiKey'}
        )
        fetchMock.mock(
            (url, opts) => opts.body.indexOf('generateApiKey') !== -1,
            '{"data": {"result": "baz"}}',
            {name: 'generateApiKey'}
        )

        this.api.getApiKey('foo', 'bar').then(function(apiKey) {
            should(apiKey).equal('baz')
            should(fetchMock.called('getApiKey')).be.true()
            should(fetchMock.called('generateApiKey')).be.false()
            done()
        })
    })
})
