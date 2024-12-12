import propTypes from 'prop-types'
import { TrashIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@/app/MTailwind'
import { useState } from 'react'

export const MedicalHistoryItem = ({ item, index, handleDelete }) => {
  const [isTrashIconVisible, setIsTrashIconVisible] = useState(false)

  return (
    <li
      key={`${item?.titulo}-${item?.descripcion}-${index}`}
      className="flex items-center justify-between gap-2 break-words ml-2"
      onMouseEnter={() => setIsTrashIconVisible(true)}
      onMouseLeave={() => setIsTrashIconVisible(false)}
    >
      <p
        className={`break-words overflow-hidden whitespace-normal ${isTrashIconVisible ? 'line-through' : ''}`}
      >
        <strong>
          {item?.titulo.charAt(0).toUpperCase() + item?.titulo.slice(1)}:
        </strong>
        {item?.descripcion}
      </p>
      <IconButton
        variant="text"
        onClick={() => handleDelete(item.id_antecedente)}
        className={`w-6 h-6 ${isTrashIconVisible ? 'block' : 'opacity-0'}`}
      >
        <TrashIcon className="h-4 w-4 stroke-3 text-blush-500" />
      </IconButton>
    </li>
  )
}

MedicalHistoryItem.propTypes = {
  item: propTypes.object,
  index: propTypes.number,
  handleDelete: propTypes.func,
}
