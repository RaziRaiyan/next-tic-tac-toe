import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import Background from '../components/Background';

const RenderWithBackground = ({children}) => {
    return (
        <Background>
            {children}
        </Background>
    )
}

const customRender = (ui, options) => 
    render (ui, {
        wrapper: RenderWithBackground,
        ...options
    });

export * from '@testing-library/react';
export {customRender as render};