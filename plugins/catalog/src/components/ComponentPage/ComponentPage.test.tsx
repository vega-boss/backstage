/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import ComponentPage from './ComponentPage';
import { render } from '@testing-library/react';
import * as React from 'react';
import { wrapInTheme } from '@backstage/test-utils';
import { ApiProvider, ApiRegistry, errorApiRef } from '@backstage/core';

const getTestProps = (componentName: string) => {
  return {
    match: {
      params: {
        name: componentName,
      },
    },
    history: {
      push: jest.fn(),
    },
  };
};

const errorApi = { post: () => {} };

describe('ComponentPage', () => {
  it('should redirect to component table page when name is not provided', async () => {
    const props = getTestProps('');
    await render(
      wrapInTheme(
        <ApiProvider apis={ApiRegistry.from([[errorApiRef, errorApi]])}>
          <ComponentPage {...props} />
        </ApiProvider>,
      ),
    );
    expect(props.history.push).toHaveBeenCalledWith('/catalog');
  });
});
