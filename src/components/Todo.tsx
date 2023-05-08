import React from 'react'
import Trpc from '~/pages/api/trpc/[trpc]'
import { api } from '~/utils/api'
import { Todo } from "../types"

type TodoProps = {
    todo: Todo
}

const Todo = ({todo}: TodoProps) => {

  const {id, text, done} = todo

  const trpc = api.useContext()

  const {mutate: doneMutation} = api.todo.toggle.useMutation({
	  onSettled: async () => {
		await trpc.todo.all.invalidate()
	  }
  })

  const {mutate: deleteMutation} = api.todo.delete.useMutation({
	onSettled: async () => {
	  await trpc.todo.all.invalidate()
	}
})

  return (
    <>
   <div
			className="flex gap-2 items-center justify-between"
		>
			<div className="flex gap-2 items-center">
				<input
					className="cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
					type="checkbox" name="done" id="done"
					checked={done}
					onChange={(e) => {
						doneMutation({id, done: e.target.checked})
					}}
				/>
				<label htmlFor={id} className={`cursor-pointer`}>
					{text}
				</label>
			</div>
			<button
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				onClick={() => {
					deleteMutation(id)
				}}
			>
			 Delete
			</button>
		</div>
    </>
  )
}

export default Todo