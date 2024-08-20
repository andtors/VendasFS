import React from 'react'
import {Menu} from "@/app/components"

type Props = {}

interface LayoutProps {
    titulo?: string;
    children?: React.ReactNode; 
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

