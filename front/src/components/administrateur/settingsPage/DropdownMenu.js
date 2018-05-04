import React, { PureComponent } from 'react'
import './DropdownMenu.css'

class DropdownMenu extends PureComponent {


    render() {
        const {
            style,
            visible,
            options,
            onSelect
        } = this.props

        if (!visible) return null;
        return (
            <div
                className="dropdown"
                style={{
                    ...style
                }}
            >
                {options.map((label, index) => (
                    <div 
                        className="option"
                        key={index}
                        onClick={() => onSelect(label)}
                    >
                        {label}
                    </div>
                ))}
            </div>
        )

    }

}

export default DropdownMenu
