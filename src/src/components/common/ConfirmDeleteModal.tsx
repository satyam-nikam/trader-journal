import Button from "./Button";
import Modal from "./Modal";

export default function ConfirmDeleteModal({isOpen, onClose, onDelete} : any){

    const header = "Delete";

    const footer = (
        <div className="flex gap-2">
              <Button type="button" btnType="danger" text="Cancel" onClick={onClose} />
              <Button type="button" text="Confirm" onClick={onDelete} />
            </div>
    )
    return(
        <Modal isOpen={isOpen} onClose={onClose} header={header} footer={footer}>
            Are you sure you want to delete?
        </Modal>
    )
}