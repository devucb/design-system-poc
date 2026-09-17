import {render} from '@testing-library/react-native';
import {composeStories} from '@storybook/react';
import * as ButtonStories from '../Button/Button.stories';
import * as CardStories from '../Card/Card.stories';
import * as ContainerStories from '../Container/Container.stories';
import * as HeaderStories from '../Header/Header.stories';
import * as SectionStories from '../Section/Section.stories';
import * as TextStories from '../Text/Text.stories';
import * as TextFieldStories from '../TextField/TextField.stories';

const textStories = composeStories(TextStories);
const buttonStories = composeStories(ButtonStories);
const cardStories = composeStories(CardStories);
const sectionStories = composeStories(SectionStories);
const headerStories = composeStories(HeaderStories);
const textFieldStories = composeStories(TextFieldStories);
const containerStories = composeStories(ContainerStories);

describe('portable stories', () => {
  it.each(Object.entries(textStories))('Text/%s', (_name, Story) => {
    expect(render(<Story />).toJSON()).toMatchSnapshot();
  });

  it.each(Object.entries(buttonStories))('Button/%s', (_name, Story) => {
    expect(render(<Story />).toJSON()).toMatchSnapshot();
  });

  it.each(Object.entries(cardStories))('Card/%s', (_name, Story) => {
    expect(render(<Story />).toJSON()).toMatchSnapshot();
  });

  it.each(Object.entries(sectionStories))('Section/%s', (_name, Story) => {
    expect(render(<Story />).toJSON()).toMatchSnapshot();
  });

  it.each(Object.entries(headerStories))('Header/%s', (_name, Story) => {
    expect(render(<Story />).toJSON()).toMatchSnapshot();
  });

  it.each(Object.entries(textFieldStories))('TextField/%s', (_name, Story) => {
    expect(render(<Story />).toJSON()).toMatchSnapshot();
  });

  it.each(Object.entries(containerStories))('Container/%s', (_name, Story) => {
    expect(render(<Story />).toJSON()).toMatchSnapshot();
  });
});
