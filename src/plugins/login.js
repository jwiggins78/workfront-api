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

module.exports = function(Api) {
    /**
     * Logs in into Workfront. Should be a first call to Workfront API.
     * Other calls should be made after this one will be completed.
     * @param {String} username    A username in Workfront
     * @param {String} password    Password to use
     * @return {Promise}    A promise which will resolved with logged in user data if everything went ok and rejected otherwise
     */
    Api.prototype.login = function (username, password) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.request('login', {username: username, password: password}, null, Api.Methods.POST)
                .then(function (data) {
                    that.httpOptions.headers.sessionID = data.sessionID;
                    resolve(data);
                }, reject);
        });
    };
};