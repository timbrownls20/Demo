import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SpellingList from './SpellingList';
import { DataMuseApi } from '../services/DataMuseApi'
import { Config } from '../config'
import WordData from '../model/WordData'

test('renders correct spelling', async () => {
  
  DataMuseApi.prototype.GetRandomWord = async () => {
      return [
          new WordData({word:"dummy", tags:["f:10"], defs:["def 1"]})
      ];
  }

  Config.frequencyLower = 0;
  Config.frequencyUpper = 1000;
  Config.spellingListLength = 1;

  const r = render(<SpellingList />);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const debug = r.container.outerHTML;

  await waitFor(() => {
    const element = screen.getByText(/dummy/i);
    expect(element).toBeInTheDocument();
  })
  
});
