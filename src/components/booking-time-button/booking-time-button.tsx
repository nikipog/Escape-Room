
type BookingTimeButtonProps = {
  time: string;
  isAvailable: boolean;
  name: string;
}

const BookingTimeButton = ({ time, isAvailable, name }: BookingTimeButtonProps): JSX.Element => (
  <label className={`custom-radio booking-form__date ${!isAvailable ? 'custom-radio--disabled' : ''}`}>
    <input
      type="radio"
      name={name}
      required
      defaultValue={time}
      disabled={!isAvailable}
    />
    <span className="custom-radio__label">{time}</span>
  </label>
);

export default BookingTimeButton;
