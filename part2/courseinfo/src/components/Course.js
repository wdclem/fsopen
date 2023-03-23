import React from 'react'

const Header = ({ name }) => <h1>{name}</h1>

const Course = ({ course }) => {
    const total = course.parts.reduce((sum, cours) => sum + cours.exercises, 0)
    const exercises = course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)

    return (
        <div>
            <Header name={course.name} />
            {exercises}
            <strong>total of {total} exercises</strong>
        </div>
    )
}

export default Course