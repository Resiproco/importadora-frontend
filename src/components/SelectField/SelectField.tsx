import style from "./SelectField.module.css";

import { Dropdown } from "primereact/dropdown";

interface SelectFieldProps {
	textLabel?: string;
	value: any
	error?: any;
	name: string;
	placeholder?: string;
	optionLabel?: string;
	onChange: (e: any) => void;
	options: any[];
	direction?: "row" | "column";
	labelWidth?: string;
	disabled?: boolean;
}

export const SelectField = ({
	textLabel,
	value,
	name,
	placeholder = "Seleccione una opción",
	optionLabel = "name",
	onChange,
	options,
	direction = "column",
	labelWidth = "100%",
	disabled = false,
	error
}: SelectFieldProps) => {
	const styles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "16px",
	};

	const selectedCountryTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div >
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

	const countryOptionTemplate = (option: any) => {
        return (
            <div >
                <div>{name ==="suboptions" ? `${option.name}` : `${option.id} - ${option.name}` }</div>
            </div>
        );
    };

	const optionsWithIdAsString = options && options.map(option => ({
        ...option,
        id: option.id.toString()
    }));

	return (
		<div className={`${direction == "column" ? style.column__item : style.row__item}`}>
			{textLabel ? <label style={styles}>{textLabel}</label> : <></>}

			<div className={style.input_with_error}>
			<Dropdown
				className="p-inputtext-sm"
				style={{ minWidth: "200px"}}
				name={name}
				value={value}
				onChange={(e) => onChange({ target: { name, value: e.value }})}
				options={optionsWithIdAsString}
				disabled={disabled}
				optionLabel={optionLabel}
				placeholder={placeholder}
				filter={name !== "suboptions"}
				filterBy="name,id,client_number" 
				valueTemplate={selectedCountryTemplate}
				itemTemplate={countryOptionTemplate}
				panelStyle={{width: '100%'}}
				emptyMessage={<p className={style.emptyMessage__text}>No hay resultados.</p>}
			/>
			{error && (
				<div className={style.error}>{error}</div>
			)}
			</div>
		</div>
	);
};
