import {notFound} from "next/navigation";

async function post(url: string, data: any){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (!res.ok) {
            const errorResponse = await res.json();
            throw errorResponse;
        }
    
        return res.json();
    } catch (error) {
        throw error;
    }
}

async function postForm(url: string, data: any){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: data,
        });
    
        if (!res.ok) {
            const errorResponse = await res.json();
            throw errorResponse;
        }
    
        return res.json();
    } catch (error) {
        throw error;
    }
}

async function putForm(url: string, data: any){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: data,
        });
    
        if (!res.ok) {
            const errorResponse = await res.json();
            throw errorResponse;
        }
    
        return res.json();
    } catch (error) {
        throw error;
    }
}

async function put(url: string, data: any){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (!res.ok) {
            const errorResponse = await res.json();
            throw errorResponse;
        }
    
        return res.json();
    } catch (error) {
        throw error;
    }
}

async function del(url: string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!res.ok) {
            const errorResponse = await res.json();
            throw errorResponse;
        }
    
        return res.json();
    } catch (error) {
        throw error;
    }
}

async function get(url: string, params?: any){
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        next: {revalidate: 10},
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) {
        notFound()
    }

    return res.json()
}

export {
    post,
    get,
    put,
    del,
    postForm,
    putForm
}