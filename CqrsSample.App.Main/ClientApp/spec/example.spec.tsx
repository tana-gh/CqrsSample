import '@testing-library/jest-dom'
import * as React from 'react'
import {
    render,
    screen
} from '@testing-library/react'

describe('react', () => {
    it('dom', () => {
        const message = 'test'
        render(<div>{ message }</div>)
        expect(screen.getByText(message)).toBeInTheDocument()
    })
})
