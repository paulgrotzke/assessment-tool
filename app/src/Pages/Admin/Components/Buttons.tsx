import tw, { styled } from 'twin.macro';

type Props = {
  showAddNew: boolean;
  setShowAddNew: (bool: boolean) => void;
  showGeneral: boolean;
  setShowGeneral: (bool: boolean) => void;
  showQuestionStatistics: boolean;
  setShowQuestionStatistics: (bool: boolean) => void;
};

const Buttons = (props: Props) => {
  return (
    <Wrapper>
      <Button
        onClick={() => {
          props.setShowQuestionStatistics(false);
          props.setShowAddNew(false);
          props.setShowGeneral(true);
        }}>
        General
      </Button>
      <Button
        onClick={() => {
          props.setShowGeneral(false);
          props.setShowAddNew(false);
          props.setShowQuestionStatistics(true);
        }}>
        Statistics
      </Button>
      <Button
        onClick={() => {
          props.setShowGeneral(false);
          props.setShowQuestionStatistics(false);
          props.setShowAddNew(true);
        }}>
        Add
      </Button>
    </Wrapper>
  );
};

export default Buttons;

const Wrapper = styled.div``;

const Button = styled.button`
  ${tw`
    mr-1 p-1 mb-1
    uppercase border-2 border-indigo-500 rounded-md
  `}
`;
