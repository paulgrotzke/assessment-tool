import tw, { styled } from 'twin.macro'
import AuthCheck from '../../Components/AuthCheck'
import { firestore } from '../../lib/firebase'

type Props = {
  setShowGeneralQuestions: (bool: boolean) => void
}

const Disclaimer = (props: Props) => {
  if (!localStorage.getItem('docRef')) {
    firestore
      .collection('surveys')
      .add({})
      .then((docRef) => {
        localStorage.setItem('docRef', docRef.id)
      })
      .catch((e) => {})
  } else {
    props.setShowGeneralQuestions(true)
  }

  return (
    <AuthCheck role="user">
      <Wrapper>
        <h2>Disclaimer</h2>
        <h3>Brief explanation of the assessment tool</h3>
        <p>
          You will be guided through assessmenmt questions step by step. Your
          data will be stored anonymously, secure and will only be used for
          scientiffic purposes. Assessment will take about 20-30 minutes.
        </p>
        <Button
          type="button"
          onClick={() => {
            props.setShowGeneralQuestions(true)
          }}
        >
          Start assessment
        </Button>
      </Wrapper>
    </AuthCheck>
  )
}

export default Disclaimer

const Wrapper = styled.div`
  > h2 {
    ${tw`
      pt-8
      font-light text-3xl uppercase 
    `}
  }

  > h3 {
    ${tw`
      mt-2 mb-3
      font-medium text-lg 
    `}
  }
`

const Button = styled.button`
  ${tw`
    py-2 px-6 mt-6
    bg-indigo-600 rounded-md text-white
    focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
`
