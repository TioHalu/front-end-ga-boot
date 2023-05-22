export default function formatDate(dateTimeString: Date): string {
	const date = new Date(dateTimeString)
	const formattedDate = date.toISOString().split('T')[0]
	const formattedTime = date.toLocaleTimeString('en-US', { hour12: false })

	return formattedDate + ' - ' + formattedTime
}
