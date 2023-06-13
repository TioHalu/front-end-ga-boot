import React from 'react'
import styles from './index.module.scss'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import clsx from 'clsx'

function Input({ placeholder, onChange, disabled, label, variant, icon, value, name, options, errors, selected, type = 'text' }: any) {
	const [eye, setEye] = React.useState(false)
	const _handleMouseDown = () => {
		setEye(!eye)
	}
	const Variant = (variant: string) => {
		switch (variant) {
			case 'biasa':
				return (
					<div className={styles.inputWrapper}>
						<input placeholder={placeholder} onChange={onChange} />
					</div>
				)
			case 'kata-sandi':
				return (
					<div className={clsx(styles.inputWrapper, variant === 'kata-sandi' && styles.sandi)}>
						<input placeholder={placeholder} onChange={onChange} type={eye ? 'text' : 'password'} />
						<button onClick={_handleMouseDown} type="button">
							{eye ? <VisibilityIcon fontSize="inherit" /> : <VisibilityOffIcon fontSize="inherit" />}
						</button>
					</div>
				)
			case 'form':
				return (
					<div className={styles.formWrapper}>
						{icon}
						<input
							placeholder={placeholder}
							className="disabled:cursor-not-allowed disabled:bg-gray-300"
							disabled={disabled}
							onChange={onChange}
							value={value}
							name={name}
							type={type}
						/>
					</div>
				)
			case 'select':
				return (
					<div className={styles.formSelect}>
						{icon}
						<select
							className="disabled:cursor-not-allowed disabled:bg-gray-300"
							disabled={disabled}
							value={selected}
							name={name}
							onChange={onChange}
							placeholder={placeholder}
						>
							<option value="">{placeholder}</option>
							{options?.map((option: any, i: number) => (
								<option key={i} selected={option.value === selected}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				)
			case 'toggle':
				return (
					<div className="relative inline-flex items-center cursor-pointer" onClick={onChange}>
						<input type="checkbox" className="sr-only peer" checked={value} />
						<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green"></div>
					</div>
				)
			default:
				break
		}
	}
	return (
		<div className={styles.root}>
			<label className={styles.inputLabel}>{label}</label>
			{Variant(variant)}
			{errors && <p className={styles.error}>{errors}</p>}
		</div>
	)
}

export default Input
