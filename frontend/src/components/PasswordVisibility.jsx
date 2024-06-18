const PasswordVisibility = ({ visibility, toggleVisibility }) => {
	return (
		<label className='flex justify-end items-center mt-2 text-gray-900 dark:text-white'>
			<span className='ml-1'>Show password</span>
			<input
				type='checkbox'
				checked={visibility}
				onChange={toggleVisibility}
				className='size-5 ml-1'
			/>
		</label>
	)
}

export default PasswordVisibility
