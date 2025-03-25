import CallToAction from "../components/CallToAction";

export default function Projects() {
  return (
    <div className="container projects">
      <div className="dox">
        <h1 className="text-3xl font-semibold">Pojects</h1>
        <p className="text-md text-gray-500">Build fun and engaging projects while learning HTML, CSS, and JavaScript!</p>
      </div>
      <div class="call-to-action">
        <CallToAction />
      </div>
    </div>
  );
}
