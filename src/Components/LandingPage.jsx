import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export default function LandingPage(){
    return(
        <InputGroup className="mb-3">
            <Form.Control 
                placeholder="Your email..." 
                aria-label="email" a
                ria-describedby="basic-addon1" 
            />
            <InputGroup.text 
                id="basic-addon1">.com</InputGroup.text>
        </InputGroup>
    )
}