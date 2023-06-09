import Modal from "react-bootstrap/Modal";

const ModalBanniere = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span>Bugatti Chiron</span>
          <span>
            <img
              width={80}
              className="img-fluid ms-3"
              src="/images/car3.png"
              alt="logo"
            />
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          La Bugatti Chiron est une supercar de renommée mondiale qui incarne
          l'excellence technique et le luxe opulent. Avec son design
          spectaculaire, sa puissance démesurée et ses performances
          ahurissantes, la Chiron est l'une des voitures les plus exclusives et
          les plus convoitées au monde. Le design extérieur de la Bugatti Chiron
          est à couper le souffle. Ses lignes sculpturales et aérodynamiques
          donnent à la voiture une apparence à la fois élégante et agressive.
          Des courbes fluides, des surfaces raffinées et des détails
          minutieusement travaillés témoignent du savoir-faire exceptionnel de
          Bugatti en matière de design automobile. Sous le capot, la Chiron
          abrite un moteur monstrueux. Son moteur W16 quadri-turbo de 8 litres
          développe une puissance prodigieuse de 1 500 chevaux et un couple de 1
          600 Nm. Cette puissance incroyable permet à la Chiron d'atteindre une
          vitesse de pointe limitée électroniquement à 420 km/h, ce qui en fait
          l'une des voitures les plus rapides du monde.
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default ModalBanniere;
