import { Button } from '../styled-components/Button';
import { TitleH3 } from '../styled-components/Typography';

function PlaceBoatConfirm({ remainingBoat, currentBoat, confirmActions }) {
  const { cancelBoat, confirmBoat, onFinish } = confirmActions;

  if (remainingBoat.length === 0) {
    return (
      <div>
        <Button fullWidth margin="4px 0" onClick={onFinish}>
          Finish (save)
        </Button>
      </div>
    );
  }

  if (!remainingBoat.includes(currentBoat.length)) return null;

  return (
    <div>
      <TitleH3>Confirm this boat ?</TitleH3>
      <div style={{ marginTop: 8 }}>
        <Button fullWidth margin="4px 0" color="primary" onClick={confirmBoat}>
          Add this boat
        </Button>
        <Button fullWidth margin="4px 0" color="secondary" onClick={cancelBoat}>
          Cancel this boat
        </Button>
      </div>
    </div>
  );
}

export default PlaceBoatConfirm;
