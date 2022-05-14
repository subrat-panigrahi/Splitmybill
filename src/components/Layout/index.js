import './Layout.css';
export default function Layout({ children }) {
  return (
    <div className="pageContainer">
      <left />
      <div className="left">left</div>
      <div className="right">{children}</div>
    </div>
  );
}
