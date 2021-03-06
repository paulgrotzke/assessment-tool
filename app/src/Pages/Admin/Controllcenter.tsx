import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'
import AuthCheck from '../../Components/AuthCheck'
import useSurveys from './hooks/useSurveys'
import GeneralStatistics from './Components/GeneralStatistics'
import QuestionStatistics from './Components/QuestionStatistics'
import Buttons from './Components/Buttons'
import NewQuestion from './Components/NewQuestion'

const Controllcenter = () => {
  const surveys = useSurveys()

  const [focusArea, setFocusArea] = useState('')
  const [digitalCapability, setDigitalCapability] = useState('')
  const [practiceItem, setPracticeItem] = useState('')
  const [maturityStage, setMaturityStage] = useState('')

  const [showQuestionStatistics, setShowQuestionStatistics] = useState(false)
  const [showGeneral, setShowGeneral] = useState(false)
  const [showAddNew, setShowAddNew] = useState(false)

  if (showQuestionStatistics) {
    return (
      <AuthCheck role="admin">
        <Wrapper>
          <Buttons
            showAddNew={showAddNew}
            setShowAddNew={setShowAddNew}
            showGeneral={showGeneral}
            setShowGeneral={setShowGeneral}
            showQuestionStatistics={showQuestionStatistics}
            setShowQuestionStatistics={setShowQuestionStatistics}
          />
          <QuestionStatistics surveys={surveys} />
        </Wrapper>
      </AuthCheck>
    )
  }

  if (showAddNew) {
    return (
      <AuthCheck role="admin">
        <Wrapper>
          <Buttons
            showAddNew={showAddNew}
            setShowAddNew={setShowAddNew}
            showGeneral={showGeneral}
            setShowGeneral={setShowGeneral}
            showQuestionStatistics={showQuestionStatistics}
            setShowQuestionStatistics={setShowQuestionStatistics}
          />
          <NewQuestion
            focusArea={focusArea}
            setFocusArea={setFocusArea}
            digitalCapability={digitalCapability}
            setDigitalCapability={setDigitalCapability}
            practiceItem={practiceItem}
            setPracticeItem={setPracticeItem}
            maturityStage={maturityStage}
            setMaturityStage={setMaturityStage}
          />
        </Wrapper>
      </AuthCheck>
    )
  }

  return (
    <AuthCheck role="admin">
      <Wrapper>
        <Buttons
          showAddNew={showAddNew}
          setShowAddNew={setShowAddNew}
          showGeneral={showGeneral}
          setShowGeneral={setShowGeneral}
          showQuestionStatistics={showQuestionStatistics}
          setShowQuestionStatistics={setShowQuestionStatistics}
        />
        <GeneralStatistics surveys={surveys} />
      </Wrapper>
    </AuthCheck>
  )
}

export default Controllcenter

const Wrapper = styled.div`
  ${tw`
    h-5/6 w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 2xl:w-4/12
    px-4 md:px-10 py-6 my-10
    bg-white rounded-md shadow-2xl
    overflow-y-auto
  `}

  > h2 {
    ${tw`
      mb-6 pt-8
      font-light text-3xl uppercase 
    `}
  }

  > h3 {
    ${tw`
      mt-4 mb-1
      font-medium text-lg 
    `}
  }
`
