import Modal from "@/components/common/Modal";

export default function CreateRuleModal({ onClose, rule, isOpen } : { onClose: () => void, rule?: any, isOpen: boolean }) {
    const header = rule?.id ? "Edit Rule" : "Create New Rule";

    const footer = (
        <div>
            <button>
                Save
            </button>
            <button>
                Clear All
            </button>
            <button onClick={onClose} className="ml-2 bg-gray-300 px-3 py-1 rounded">
                Cancel
            </button>
        </div>
    )
  return (
    <Modal isOpen={isOpen} onClose={onClose} header={header} footer={footer}>
        <p>create update rule modal</p>
    </Modal>
  )};