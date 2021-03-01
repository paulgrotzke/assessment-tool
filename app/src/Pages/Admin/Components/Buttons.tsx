import tw, { styled } from 'twin.macro';

type Props = {
  showGeneral: boolean;
  setShowGeneral: (bool: boolean) => void;
  showQuestionStatistics: boolean;
  setShowQuestionStatistics: (bool: boolean) => void;
  showConfiguration: boolean;
  setShowConfiguration: (bool: boolean) => void;
};

const Buttons = (props: Props) => {
  return (
    <Wrapper>
      <Button
        onClick={() => {
          props.setShowGeneral(true);
          props.setShowQuestionStatistics(false);
          props.setShowConfiguration(false);
        }}>
        General
      </Button>
      <Button
        onClick={() => {
          props.setShowQuestionStatistics(true);
          props.setShowConfiguration(false);
          props.setShowGeneral(false);
        }}>
        Question Statistics
      </Button>
      <Button
        onClick={() => {
          props.setShowConfiguration(true);
        }}>
        Config
      </Button>
    </Wrapper>
  );
};

export default Buttons;

const Wrapper = styled.div`
  > h2 {
    ${tw`
      mb-6 mt-6
      font-extrabold text-2xl uppercase
    `}
  }
`;

const Button = styled.button`
  ${tw`
    bg-indigo-600 rounded-md py-2 px-6 mx-1
    text-white
    focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500
  `}
`;
