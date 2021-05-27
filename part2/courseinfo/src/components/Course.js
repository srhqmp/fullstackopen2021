import React from 'react';

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => part.exercises + sum, 0)

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <div><strong>total of {total} exercises</strong></div>
        </div>
    )
}

export default Course