'use client'

import { useChat } from 'ai/react'
import Image from 'next/image'
import { UserRoundIcon, SendHorizonalIcon } from 'lucide-react'
import { TextField } from './text-field'
import { Button } from '../ui/button'
import { Group, TextArea } from 'react-aria-components'
import { cx } from '@/lib/cva.config'
import ReactMarkdown from 'react-markdown'
import { Form } from '@/ui/form'

export function AIPrompt() {
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat()

	return (
		<div className="fixed right-4 bottom-4 bg-card rounded border max-w-xl p-4 flex flex-col gap-8">
			<div className="flex flex-col px-4 gap-4 pb-4 max-w-lg max-h-64 overflow-y-auto">
				{messages.map((m) => (
					<div className="flex flex-1 gap-4 items-start" key={m.id}>
						<div className="flex shrink-0 flex-col">
							{m.role === 'user' ? (
								<div className="rounded-full bg-muted p-2">
									<UserRoundIcon className="size-6" />
								</div>
							) : (
								<div className="rounded-full bg-muted p-2">
									<Image
										src="/doctrina.png"
										alt="Doctrina Logo"
										width={24}
										height={24}
									/>
								</div>
							)}
						</div>

						<ReactMarkdown className="flex flex-grow max-w-full flex-col prose col-span-3">
							{m.content}
						</ReactMarkdown>
					</div>
				))}
			</div>

			<Form onSubmit={handleSubmit} className="max-w-full">
				<TextField name="prompt" isDisabled={isLoading}>
					<Group
						className={cx(
							'flex gap-2 w-[32rem] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
						)}
					>
						<TextArea
							value={input}
							placeholder="Say something to the AI..."
							onChange={handleInputChange}
							className="w-full resize-none placeholder:text-muted-foreground focus-visible:outline-none rounded focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						/>
						<Button
							aria-label="Send Prompt"
							isDisabled={isLoading}
							type="submit"
						>
							<SendHorizonalIcon />
						</Button>
					</Group>
				</TextField>
			</Form>
		</div>
	)
}
