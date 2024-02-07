'use client'

import { useChat } from 'ai/react'
import { SendHorizonalIcon, UserRoundIcon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export function AIPrompt() {
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat()

	return (
		<div>
			<div>
		<div>
			<div>
				{messages.map((m) => (
					<div key={m.id}>
						<div>
							{m.role === 'user' ? (
								<div>
									<UserRoundIcon />
								</div>
							) : (
								<div>
									<Image
										src="/doctrina.png"
										alt="Doctrina Logo"
										width={24}
										height={24}
									/>
								</div>
							)}
						</div>

						<ReactMarkdown>{m.content}</ReactMarkdown>
						<ReactMarkdown>{m.content}</ReactMarkdown>
					</div>
				))}
			</div>

			<form onSubmit={handleSubmit}>
				<textarea
					value={input}
					placeholder="Say something to the AI..."
					onChange={handleInputChange}
				/>
				<button aria-label="Send Prompt" disabled={isLoading} type="submit">
					<SendHorizonalIcon />
				</button>
			</form>
		</div>
	)
}
