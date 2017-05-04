import { SkyLineAiPage } from './app.po';

describe('sky-line-ai App', () => {
  let page: SkyLineAiPage;

  beforeEach(() => {
    page = new SkyLineAiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
