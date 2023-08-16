import "./ErrorMessage.scss";

interface ErrorMessageProps  {
  errorTitle: string
}

function ErrorMessage({ errorTitle }: ErrorMessageProps) {
  return (
    <div id="container">
      <div id="error-box">
        <div className="face">
          <div className="eye" />
          <div className="eye right" />
          <div className="mouth sad" />
        </div>
        <div className="shadow scale" />
        <div className="message">
          <h3 className="alert">Error!</h3>
          <p> {errorTitle || "Oh no, something went wrong"}</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
