import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) => render(ui,{wrapper: OrderDetailsProvider, ...options});

export { screen, fireEvent }  from "@testing-library/react";

export {renderWithContext as render}
