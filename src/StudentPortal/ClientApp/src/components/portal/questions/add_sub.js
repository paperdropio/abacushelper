import React, { Component, useContext, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import axios from 'axios';
import './question.css';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import HelpIcon from '@material-ui/icons/Help';
import { green, red } from '@material-ui/core/colors';
import { getEllapsedSeconds } from '../utility_methods';

const calculateAnswer = (data) => {
    if ( !_.isUndefined(data) && !_.isUndefined(data.numbers) && data.numbers.length > 0){
        let count = 0;
        _.forEach(data.numbers, (d) => { count = count+d.number;});
        return count;
    }

    return null;
}

const AddSub = ({onQuestionAnswered, data}) => {
    const onQuestionAnsweredEvent = onQuestionAnswered;
    const [answer, setAnswer] = useState();
    const [answerValid, setAnswerValid] = useState(false);
    const [start, setStart] = useState(null);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const correctAnswer = calculateAnswer(data);

    useEffect(() => {

        setTotalSeconds(totalSeconds);
        setAnswerValid(false);
        setAnswer('');
        setStart(Date.now());
    }, [data]);
    
    const handleAnswerKeyDown = (e) => {
        if(e.key === 'Enter'){

            let totalSecondsTaken = getEllapsedSeconds(start);

            setTotalSeconds(totalSecondsTaken);

            if ( answer == correctAnswer ) {
                onQuestionAnsweredEvent({result: true, totalSeconds: totalSecondsTaken});
                setAnswerValid(true);
            }
            else {
                onQuestionAnsweredEvent({result: false, totalSeconds: totalSecondsTaken});
                setAnswerValid(false);
            }
        }
    }

    return (
        <React.Fragment>
        {data && data.numbers &&
            <div class="container question_container">   
            {_.sortBy(data.numbers, 'sortBy').map((item) => {
                return <div class="row">
                    <div class="col-xs sign">
                        {item.number >= 0 ? '+' : '-' }
                    </div>
                    <div class="col-sm number">
                        {Math.abs(item.number)}
                    </div>
                    <div class="col-xxl">
                        &nbsp;
                    </div>
                </div>
            })}
            <div class="row">
                <div class="col-xs sign">
                    Answer:
                </div>
                <div class="col-sm total number">
                    <TextField type="number" value={answer} size="small" InputProps={{autoFocus: true}} onChange={(e) => setAnswer(e.target.value)} 
                        onKeyPress={(e) => handleAnswerKeyDown(e)} />
                    {answerValid && <CheckIcon style={{ color: green[500] }} /> }
                    {!answerValid && <ClearIcon style={{ color: red[500] }} /> }
                    {answerValid && <div>You took {totalSeconds} sec</div>}
                </div>
                <div class="col-xxl">
                    &nbsp;
            </div>
            </div>
        </div>
        }
        </React.Fragment>
    );
}

export default AddSub;