import {Menu} from "@/app/components"
import { Message } from "@/app/components";
import { Alert } from "../common/message/Message";

interface LayoutProps {
    titulo?: string;
    children?: React.ReactNode; 
    mensagens?: Array<Alert>
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div className='app'>
        <section className='main-content columns is-fullheight'>
            <Menu />
            <div className='container column is-10'>
                <div className='section'>
                    <div className="card">
                        <div className="card-header">
                            <p className="card-header-title">
                                {props.titulo}
                            </p>   
                        </div>
                        <div className="card-content">
                            <div className="content">
                                {props.mensagens && 
                                    props.mensagens.map(
                                        msg => <Message key={msg.texto} {...msg} />
                                    )
                                }
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

