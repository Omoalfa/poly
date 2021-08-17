import { useState, useEffect } from 'react'

const Checkbox = ({ member, index, defaultChecked, onChange }) => {
    const id = `project-edit-${member.id}`
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(defaultChecked)
        defaultChecked && onChange({ target: { checked: defaultChecked, value: member.id } })
    }, [defaultChecked])

    return (
        <div className="custom-control custom-checkbox" key={index}>
            <input id={id}
                type="checkbox"
                className="custom-control-input"
                value={member.id}
                onChange={(event) => { setChecked(!checked); onChange(event) }}
                checked={checked} />
            <label className="custom-control-label" htmlFor={id}>
                <span className="d-flex align-items-center">
                    {member.guid != null ? <img alt={member.display_name} src={member.guid} className="avatar mr-2" />
                        :
                        <img alt={member.display_name} className="avatar mr-2" src='assets/img/user.svg' />}
                    <span className="h6 mb-0" data-filter-by="text">{member.display_name}</span>
                </span>
            </label>
        </div>
    )
}

export default Checkbox