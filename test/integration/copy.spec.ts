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

describe('Copy', function() {

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

    describe('success', function() {
        beforeEach(function() {
            fetchMock.mock(
                `begin:${API_URL}/attask/api/`,
                require('../../fixtures/copy.json'),
                {
                    name: 'copy'
                }
            )
        })
        it('makes request to objCode with copySourceID in the params', function() {
            return this.api.copy('foo', 'bar').then(function() {
                const [url, opts] = fetchMock.lastCall('copy')
                should(url).endWith('foo')
                should(opts.method).equal('POST')
                should(opts.body).containEql('{"copySourceID":"bar"}')
            })
        })
        it('returns data with a new ID', function() {
            return this.api.copy('foo', 'bar').then(function(data) {
                should(data).have.property('ID')
                should(data.ID).not.containEql('bar')
            })
        })
    })
})
