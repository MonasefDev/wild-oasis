import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
// import CabinTable from './CabinTable';

function AddCabin() {
  //! we use compound Component for more reasibilite
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Create Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
        {/*         <Modal.Open opens="table">
          <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window opens="table">
          <CabinTable />
        </Modal.Window> */}
      </Modal>
    </div>
  );
}

/* function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen((show) => !show)}>Add Cabin</Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateCabinForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
} */

export default AddCabin;
